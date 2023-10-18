import { Layout } from "@/components/layouts/Layout";
import { theme } from "@/styles";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { parseCookies } from "nookies";

const authLink = setContext((_, { headers }) => {
  const token = parseCookies().token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});
const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
}

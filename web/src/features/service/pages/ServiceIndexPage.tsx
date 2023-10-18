import { Loading } from "@/components/parts/Loading";
import { useGetServicesQuery } from "@/gql/graphql";
import Error from "next/error";
import { ServiceListViews } from "../templates/ServiceListViews";

export function ServiceIndexPage() {
  const { loading, error, data } = useGetServicesQuery();

  if (loading) return <Loading />;
  if (!data || error) return <Error statusCode={500} />;
  if (!data.services) return <Error statusCode={404} />;

  return <ServiceListViews services={data.services} />;
}

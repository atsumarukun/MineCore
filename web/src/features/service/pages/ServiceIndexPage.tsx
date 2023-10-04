import { Loading } from "@/components/parts/Loading";
import { useGetServicesQuery } from "@/gql/graphql";
import Error from "next/error";
import { ServiceListViews } from "../templates/ServiceListViews";
import { useContext, useEffect } from "react";
import { RefetchContext } from "@/providers/RefetchProvider";

export function ServiceIndexPage() {
  const refetchContext = useContext(RefetchContext);

  const { loading, error, data, refetch } = useGetServicesQuery();

  useEffect(() => {
    refetchContext.setFn({ refetch: refetch });
  }, [refetch]);

  if (loading) return <Loading />;
  if (!data || error) return <Error statusCode={500} />;
  if (!data.services) return <Error statusCode={404} />;

  return <ServiceListViews services={data.services} />;
}

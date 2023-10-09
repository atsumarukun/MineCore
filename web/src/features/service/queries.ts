import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
  query GetServices {
    services {
      name
      path
      status
    }
  }
`;

export const START_SERVICE = gql`
  mutation StartService($path: String!) {
    startService(path: $path)
  }
`;

export const STOP_SERVICE = gql`
  mutation StopService($path: String!) {
    stopService(path: $path)
  }
`;

export const RESTART_SERVICE = gql`
  mutation RestartService($path: String!) {
    restartService(path: $path)
  }
`;

export const REBUILD_SERVICE = gql`
  mutation RebuildService($path: String!) {
    rebuildService(path: $path)
  }
`;

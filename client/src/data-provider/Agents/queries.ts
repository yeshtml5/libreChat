import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, dataService, EModelEndpoint, PermissionBits } from 'librechat-data-provider';
import type {
  QueryObserverResult,
  UseQueryOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type t from 'librechat-data-provider';

/**
 * AGENTS
 */
export const defaultAgentParams: t.AgentListParams = {
  limit: 10,
  requiredPermission: PermissionBits.EDIT,
};
/**
 * Hook for getting all available tools for A
 */
export const useAvailableAgentToolsQuery = (): QueryObserverResult<t.TPlugin[]> => {
  const queryClient = useQueryClient();
  const endpointsConfig = queryClient.getQueryData<t.TEndpointsConfig>([QueryKeys.endpoints]);

  const enabled = !!endpointsConfig?.[EModelEndpoint.agents];
  return useQuery<t.TPlugin[]>({
    queryKey: [QueryKeys.tools],
    queryFn: () => dataService.getAvailableAgentTools(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled,
  });
};

/**
 * Hook for listing all Agents, with optional parameters provided for pagination and sorting
 */
export const useListAgentsQuery = <TData = t.AgentListResponse>(
  params: t.AgentListParams = defaultAgentParams,
  config?: UseQueryOptions<t.AgentListResponse, unknown, TData>,
): QueryObserverResult<TData> => {
  const queryClient = useQueryClient();
  const endpointsConfig = queryClient.getQueryData<t.TEndpointsConfig>([QueryKeys.endpoints]);

  const enabled = !!endpointsConfig?.[EModelEndpoint.agents];
  return useQuery<t.AgentListResponse, unknown, TData>({
    queryKey: [QueryKeys.agents, params],
    queryFn: () => dataService.listAgents(params),
    // Example selector to sort them by created_at
    // select: (res) => {
    //   return res.data.sort((a, b) => a.created_at - b.created_at);
    // },
    staleTime: 1000 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    ...config,
    enabled: config?.enabled !== undefined ? config.enabled && enabled : enabled,
  });
};

/**
 * Hook for retrieving basic details about a single agent (VIEW permission)
 */
export const useGetAgentByIdQuery = (
  agent_id: string,
  config?: UseQueryOptions<t.Agent>,
): QueryObserverResult<t.Agent> => {
  return useQuery<t.Agent>({
    queryKey: [QueryKeys.agent, agent_id],
    queryFn: () =>
      dataService.getAgentById({
        agent_id,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    ...config,
  });
};

/**
 * Hook for retrieving full agent details including sensitive configuration (EDIT permission)
 */
export const useGetExpandedAgentByIdQuery = (
  agent_id: string,
  config?: UseQueryOptions<t.Agent>,
): QueryObserverResult<t.Agent> => {
  return useQuery<t.Agent>({
    queryKey: [QueryKeys.agent, agent_id, 'expanded'],
    queryFn: () =>
      dataService.getExpandedAgentById({
        agent_id,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    ...config,
  });
};

/**
 * MARKETPLACE
 */
/**
 * Hook for getting agent categories for marketplace tabs
 */
export const useGetAgentCategoriesQuery = (
  config?: UseQueryOptions<t.TMarketplaceCategory[]>,
): QueryObserverResult<t.TMarketplaceCategory[]> => {
  return useQuery<t.TMarketplaceCategory[]>({
    queryKey: [QueryKeys.agentCategories],
    queryFn: () => dataService.getAgentCategories(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    ...config,
  });
};

/**
 * Hook for infinite loading of marketplace agents with cursor-based pagination
 */
export const useMarketplaceAgentsInfiniteQuery = (
  params: {
    requiredPermission: number;
    category?: string;
    search?: string;
    limit?: number;
    promoted?: 0 | 1;
    cursor?: string; // For pagination
  },
  config?: UseInfiniteQueryOptions<t.AgentListResponse, unknown>,
) => {
  return useInfiniteQuery<t.AgentListResponse>({
    queryKey: [QueryKeys.marketplaceAgents, params],
    queryFn: ({ pageParam }) => {
      const queryParams = { ...params };
      if (pageParam) {
        queryParams.cursor = pageParam;
      }
      return dataService.getMarketplaceAgents(queryParams);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.after ?? undefined,
    enabled: !!params.requiredPermission,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...config,
  });
};

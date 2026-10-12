import { keepPreviousData, useQuery } from '@tanstack/react-query'
	import { membershipsService } from '../services/memberships.service';

	export function useMembers(teamId: string) {
		return useQuery({
			queryKey: ['members', teamId],
			queryFn: () => membershipsService.getByTeam(teamId),
				enabled: !! teamId,
			placeholderData: keepPreviousData, // mantiene los datos anteriores
		})
	}
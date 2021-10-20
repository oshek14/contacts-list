import { IHttpGroup } from '../../models/http-groups.model';

export interface IGroupsState {
  isFetching: boolean;
  groups: Array<IHttpGroup>;
  failed: boolean;
}
export const initialGroupsState: IGroupsState = {
  isFetching: true,
  groups: null,
  failed: false,
};

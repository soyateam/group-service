import { HttpClient } from '../utils/http.client';
import config from '../config';

const organizationGroup = 'organizationGroups';

export class KartoffelService {
  static GetOrgByID(id: string, token?: string) {
    return HttpClient.get(config.endpoints.kartoffelAPI.baseURL, `/${organizationGroup}/${id}`);
  }

  static GetChildrenOrgByParentId(parentId: string, token?: string) {
    return HttpClient.get(config.endpoints.kartoffelAPI.baseURL, `/${organizationGroup}/${parentId}/children?maxDepth=1`);
  }
}

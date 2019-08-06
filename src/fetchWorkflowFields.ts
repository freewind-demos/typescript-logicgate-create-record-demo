import axios from 'axios';
import {baseUrl} from './account';

export type Field = {
  id: string,
  name: string,
  fieldType: string,
}

export async function fetchWorkflowFields(workflowId: string, token: string): Promise<Field[]> {
  const url = `${baseUrl}/api/v1/fields/workflow/${workflowId}/values?access_token=${token}`;
  const response = await axios.get(url);
  return response.data as Field[];
}

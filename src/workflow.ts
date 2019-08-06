import axios from 'axios';
import {baseUrl} from './account';

export type Workflow = {
  id: string, // '3Gxqx3lJ',
  name: string, // 'Z Test First Flow',
  recordPrefix: string, // 'ZTST',
  allowGroups: boolean,
  requireGroups: boolean,
  xpos: number, // 413,
  ypos: number, // 251,
  priority: number, // 0,
  sla: {
    enabled: boolean,
    duration: number, // 0
  },
  sequence: null, // ???
  process: null, // ???
  userGroups: [], // ???
  objectName: string, // 'ZTST'
}

export async function fetchWorkflowId(stepId: string, token: string): Promise<Workflow> {
  const url = `${baseUrl}/api/v1/workflows/step/${stepId}?access_token=${token}`;
  const response = await axios.get<Workflow>(url, {
    data: {
      'step': {
        'id': stepId,
      },
    },
  });

  // { id: '3Gxqx3lJ',
  //   name: 'Z Test First Flow',
  //   recordPrefix: 'ZTST',
  //   allowGroups: false,
  //   requireGroups: false,
  //   xpos: 413,
  //   ypos: 251,
  //   priority: 0,
  //   sla: { enabled: false, duration: 0 },
  //   sequence: null,
  //   process: null,
  //   userGroups: [],
  //   objectName: 'ZTST'
  // }
  console.log(response.data);

  return response.data;
}

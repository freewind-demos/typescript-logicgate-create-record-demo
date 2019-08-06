import {requestToken} from './token';
import {fetchWorkflowId} from './workflow';
import {fetchWorkflowFields} from './fetchWorkflowFields';
import {createRecordToStep} from './createRecordToStep';

async function main() {
  const stepId = 'auy7PFLH';

  const token = await requestToken();
  const workflow = await fetchWorkflowId(stepId, token.access_token);
  const fields = await fetchWorkflowFields(workflow.id, token.access_token);
  console.log(JSON.stringify(fields, null, 4));
  await createRecordToStep(stepId, fields, token);
  console.log('done');
}

main();

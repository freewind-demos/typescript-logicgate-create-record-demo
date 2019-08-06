import axios from 'axios';
import {Token} from './token';
import {baseUrl} from './account';
import {Field} from './fetchWorkflowFields';

async function createRecord(token: Token, stepId: string, currentValueMaps: any[]) {
  const data = {
    'step': {
      'id': stepId,
    },
    'currentValueMaps': currentValueMaps,
  };
  console.log(JSON.stringify(data, null, 4));
  const res = await axios.post(`${baseUrl}/api/v1/records/public?access_token=${token.access_token}`, data);
  console.log(JSON.stringify(res.data, null, 4));
}

function buildInputYourNameFieldData(fields: Field[]) {
  const field = fields.find(it => it.name === 'Your name')!;
  console.log('yourNameField:', field);

  const data = {
    currentValues: [
      {
        textValue: 'Freewind222',
        discriminator: 'Common',
      },
    ],
    field: {
      id: field.id,
      fieldType: field.fieldType,
    },
  };
  return data;
}

function buildInputEmailFieldData(fields: Field[]) {
  const field = fields.find(it => it.name === 'Input Email')!;
  console.log('Input Email field:', field);

  const data = {
    currentValues: [
      {
        textValue: 'freewind222@test.com',
        discriminator: 'Common',
      },
    ],
    field,
  };
  return data;
}

function buildTransferToFieldData(fields: Field[]) {
  const field = fields.find(it => it.name === 'TransferTo')!;
  console.log('TransferTo field:', field);

  const moonOption = (field as any).currentValues.find((it: any) => it.textValue === 'Moon')!;
  console.log('moonOption: ', moonOption);

  const data = {
    currentValues: [
      moonOption,
    ],
    field: field,
  };
  return data;
}

export async function createRecordToStep(stepId: string, fields: Field[], token: Token) {

  const data1 = buildInputYourNameFieldData(fields);
  const data2 = buildInputEmailFieldData(fields);
  const data3 = buildTransferToFieldData(fields);

  await createRecord(token, stepId, [data1, data2, data3]);
}

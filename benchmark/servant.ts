import { DynamicBenchmarker } from '@nestia/benchmark';
import api from '../src/api';

const main = async (): Promise<void> => {
  const connection: api.IConnection = { host: 'http://localhost:3002' };

  await DynamicBenchmarker.servant({
    connection,
    parameters: () => [connection],
    prefix: 'test',
    location: __dirname + '/../test/features',
  });
};
main().catch((exp) => {
  process.exit(-1);
});

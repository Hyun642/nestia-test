import { DynamicBenchmarker } from '@nestia/benchmark';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import fs from 'fs';
import os from 'os';
import { AppModule } from '../src/app.module';

async function main(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  await app.listen(3002);

  const report: DynamicBenchmarker.IReport = await DynamicBenchmarker.master({
    servant: __dirname + '/servant.js',
    simultaneous: 10, // (필수) 스레드 당 동시 요청 수
    count: 1000, //  총 요청 수
    threads: 4, // CPU 스레드 수
    filter: (name) => name.includes('test_api_post_create'),
    stdio: 'ignore',
  });

  await app.close();

  const cpu: string = os.cpus()[0].model.trim();
  const title: string = `## ${cpu} (Threads ${report.threads})`;
  await fs.promises.writeFile(
    'BENCHMARK.md',
    [title, DynamicBenchmarker.markdown(report)].join('\n\n'),
    'utf8',
  );
  console.log('Benchmark complete. Check BENCHMARK.md');
}
main().catch((exp) => {
  console.error(exp);
  process.exit(-1);
});

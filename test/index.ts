import { DynamicExecutor } from '@nestia/e2e';
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import api from '../src/api'; // SDK import

async function main(): Promise<void> {
  // 1. 백엔드 서버 준비 (MyBackend.ts 역할)
  const app: INestApplication = await NestFactory.create(AppModule);
  await app.listen(3000); // 테스트용 포트 (예: 3000)

  // 2. 클라이언트 커넥터 준비
  const connection: api.IConnection = {
    host: 'http://127.0.0.1:3002',
  };

  // 3. 테스트 실행
  const report: DynamicExecutor.IReport = await DynamicExecutor.validate({
    prefix: 'test',
    parameters: () => [connection],
    location: __dirname + '/features',
  });

  // 4. 서버 종료
  await app.close();

  // 5. 결과 리포트
  const failures = report.executions.filter((exec) => exec.error !== null);
  if (failures.length === 0) {
    console.log('Success');
    console.log('Elapsed time', report.time.toLocaleString(), `ms`);
  } else {
    console.log('Failed');
    for (const f of failures) console.log(f.error); // 실패한 테스트 로그 출력
    process.exit(-1);
  }
}
main().catch((exp) => {
  console.error(exp);
  process.exit(-1);
});

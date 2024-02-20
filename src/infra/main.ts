import { HttpModule } from './http/http.module';
import { WebsocketModule } from './websocket/websocket.module';

async function bootstrap() {
  WebsocketModule(HttpModule);

  HttpModule.listen(80, () => {
    console.log('Server running in http://localhost:80/');
  });
}

bootstrap();

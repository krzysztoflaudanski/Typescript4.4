import express, { Application, Router } from 'express';
import cors from 'cors';
import departmentsRoutes from './routes/departments.routes';
import employeesRoutes from './routes/employees.routes';
import productsRoutes from './routes/products.routes';

interface Route {
  path: string;
  routes: Router;
}

class App {
  private app: Application;
  private routes: Route[] = [];
  private server: any;

  constructor() {
    this.app = express();
  }

  public addRoutes(path: string, routes: Router) {
    this.routes.push({ path, routes });
  }

  private prepareRoutes() {
    for (const group of this.routes) {
      this.app.use(group.path, group.routes);
    }
  }

  public run(port: number | string) {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.prepareRoutes();

    this.server = this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}

const app = new App();
app.addRoutes('/api/', departmentsRoutes);
app.addRoutes('/api/', employeesRoutes);
app.addRoutes('/api/', productsRoutes);
app.run(3000);

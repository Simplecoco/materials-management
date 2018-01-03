import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// console.log({ app });

export { app };

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/users'));

app.model(require('./models/applyList'));

app.model(require('./models/register'));

app.model(require('./models/login'));

app.model(require('./models/IndexPage'));

app.model(require('./models/userInfo'));

app.model(require('./models/result'));

app.model(require('./models/MaterialInfo'));

app.model(require('./models/admin'));

app.model(require('./models/user'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');


import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();
app.use(bodyparser({ jsonLimit: '7mb' }));

const professors = [
	{
		name: 'Dr Bob',
		id: 0,
		coursesTaught: [
			{
				code: 'AI 1001',
				semester: 0,
				title: 'Artificial Intelligence 1001'
			},
			{
				code: 'DB 1002',
				semester: 1,
				title: 'Database 1002'
			}
		]
	},
	{
		name: 'Dr Grevera',
		id: 1,
		coursesTaught: [
			{
				code: 'ML 1002',
				semester: 0,
				title: 'Machine Learning 1001'
			},
			{
				code: 'CI 1002',
				semester: 1,
				title: 'Computer Imaging 1002'
			}
			,
			{
				code: 'DS 1002',
				semester: 1,
				title: 'Data Structures 1002'
			}
		]
	}
];

router.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Credentials', 'true');
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type');
	ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	await next()
})

router.options('*', async (ctx, next) => {
	ctx.status = 204;
	await next();
})

router.get('/professors', ctx => {
	console.log('GET /professors');
	ctx.body = professors;
});

router.get('/professors/:professorId', ctx => {
	console.log('GET /professors/', ctx.params.professorId);
	ctx.body = professors[ctx.params.professorId];
});

router.post('/professors', ctx => {
	console.log('POST /studprofessorsents');
	const body = ctx.request.body;
	professors.push(body);
	ctx.body = body;
});

app
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(8001, () => console.log('professors server started 8001'));

export default app;
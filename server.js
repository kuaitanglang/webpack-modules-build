const inquirer = require('inquirer');
const cprocess = require('child_process');

function nextTick(params) {
	let type = params.type;
	let ProjectName = params.ProjectName;
	let cmd;
	
	if (type === 'dev') {
		cmd = 'npm run server -- --env.NODE_ENV=' + type + ' --env.name=' + ProjectName;
	} else {
		cmd = 'rimraf dist/' + ProjectName + ' && npm run build -- --env.NODE_ENV=' + type + ' --env.name=' + ProjectName;
	}
	
	let son = cprocess.spawn('cmd.exe', ['/s', '/c', cmd]);
	son.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});
	son.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});
}

const questions = [
	{
		/*
		* dev:启动本地服务
		* sit/uat/prod：构建测试或生产环境代码
		* */
		type: 'list',
		name: 'type',
		message: '请选择服务类型？(dev:启动本地服务； sit/uat/production：打包代码)',
		choices: ['dev', 'sit', 'uat', 'production'], // 可选选项
		default: 'dev',
	},
	{
		type: 'input',
		name: 'ProjectName',
		message: "输入模块名称？",
		default: function () {
			return 'demo';
		},
	},
];
inquirer.prompt(questions).then((answers) => {
	console.log(JSON.stringify(answers));
	nextTick(answers);
});
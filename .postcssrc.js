const path = require('path');

module.exports = ({ file }) => {
    // const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;

    return {
        plugins: {
            'autoprefixer': {
                browsers: [
                    '> 1%',
                    'last 10 Chrome versions',
                    'last 10 Firefox versions',
                    'Safari >= 6', 'ie > 8',
                    'ios >= 8',
                    'android >= 4.0'
                ],
            },
            'postcss-px-to-viewport': {
                unitToConvert: 'px',
                viewportWidth: 375,
                unitPrecision: 6,
                propList: ['*'],
                viewportUnit: 'vw',
                fontViewportUnit: 'vw',
                selectorBlackList: [],
                minPixelValue: 1,
                mediaQuery: true,
                // exclude: [],
                exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                landscape: false
            }
        }
    }

}
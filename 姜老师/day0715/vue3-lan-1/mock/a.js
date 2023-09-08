export default [
    {
        url: '/api/get',
        method: 'get',
        response: () => {
            // 模拟的json格式
            return {
                code: 0,
                data: { name: 'jw' }
            };
        },
    }
]
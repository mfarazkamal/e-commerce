
export const contants = {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    tokenExpiryTime: 24 * 60 * 60 * 1000,
    nonAuthPaths: [
        '/api/products/',
        '/api/products/:id',
        '/api/user/',
        '/api/user/login',
        '/api/user/admin'
    ],
    userPaths: [
        '/api/user/:id',
        '/api/orders/',
        '/api/orders/:id',
        '/api/orders/:id'
    ]
}

export const matchRoute = (route, url) => {
   
    const regexPattern = route
        .replace(/:(id|productId)/g, '(?!add|delete|update)[^/]+')  
        .replace(/\//g, '\\/');      

    console.log('regexPattern', regexPattern);

    const regex = new RegExp('^' + regexPattern + '/?$'); 

    console.log('regex', regex, regex.test(url), route, url);
    
    return regex.test(url);
};


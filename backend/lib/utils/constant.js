
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

// Function to match routes
export const matchRoute = (route, url) => {
    // Replace dynamic parts (like :id, :productId) with a regex pattern (e.g., \d+ for digits)
   const regexPattern = route
        .replace(/:\w+/g, '\\w+')  // Replace :param with \w+
        .replace(/\//g, '\\/');   // Escape all slashes
  
    const regex = new RegExp('^' + regexPattern + '$');

    console.log('regex', regex, regex.test(url), route, url);
    
    
    return regex.test(url);
};
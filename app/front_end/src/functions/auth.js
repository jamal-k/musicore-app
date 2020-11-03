export function checkAuth(props) {
    return new Promise((resolve, reject) => {
        if (!props.isAuthenticated) {
            const token = localStorage.getItem('token');
            if (!token) {
                reject(new Error('fail'))
            } else {
                fetch(process.env.REACT_APP_BACKEND_URL + 'api/token/valid', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'token': token }),
                })
                    .then(res => {
                        if (res.status === 200) {
                            const token = localStorage.getItem('token');
                            props.loginUserSuccess(token);
                            resolve('Success')

                        } else {
                            reject(new Error('fail'))

                        }
                    });

            }
        } else {
            resolve('Success')
        }
    });
  }
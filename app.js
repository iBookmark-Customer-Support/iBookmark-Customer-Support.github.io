let tkn = '';

const setError = (msg) => {
  const errorBlock = document.getElementById('error');
  errorBlock.innerText = msg;
  errorBlock.style.display = 'block';
};

const resetError = () => {
  const errorBlock = document.getElementById('error');
  const successBlock = document.getElementById('success');
  errorBlock.style.display = 'none';
  successBlock.style.display = 'none';
};

const success = (msg) => {
  const successBlock = document.getElementById('success');
  successBlock.innerText = msg;
  successBlock.style.display = 'block';
};

const postForm = () => {
  resetError();
  const password = document.getElementById('inputPassword').value;
  const passwordRepeat = document.getElementById('inputPasswordRepeat').value;
  if (!password) {
    setError('Please enter password');
    return null;
  }
  if (!passwordRepeat) {
    setError('Please enter confirm password');
    return null;
  }
  if (password !== passwordRepeat) {
    setError('Password does not match');
    return null;
  }
  axios
    .patch(
      'http://www.ibookmark.co.in/api/v1/auth/reset',
      {
        password: password,
        passwordRepeat: passwordRepeat,
        token: tkn,
      }
    )
    .then(function (response) {
      if (response) {
        const data = response.data;
        if (data && data.error) {
          setError(data.errorMessage);
        } else if (data.status === 'success') {
          success(data.msg);
        } else {
          setError('Token expired or does not exist');
        }
      }
    })
    .catch(function (error) {
      if (error.response) {
        const data = error.response.data;
        if (data.error) {
          setError(data.errorMessage);
        }
      }
    });
};

const getHash = (length) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVW!@#$%^()*())(XYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const onPageLoad = () => {
  if (typeof window !== 'undefined' && window.history) {
    const url = new URL(window.location);
    if (url && url.searchParams) {
      tkn = url.searchParams.get('rt');
      url.searchParams.set('rt', getHash(25).toLowerCase());
    }
    window.history.pushState({}, '', url);
  }
};

onPageLoad();

document.getElementById('submit').addEventListener('click', postForm);

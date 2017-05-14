module.exports = (router) => {
  // router is props.history from a component served by react router
  let cookies = {};
  for (let cookie of document.cookie.split(';')) {
    let c = cookie.trim().split('=');
    cookies[c[0]] = c[1];
  }

  if (!(cookies.fridgrSesh && cookies.fridgrSesh.userId && cookies.fridgrSesh.houseId)) {
    router.push('/login');
  }

};

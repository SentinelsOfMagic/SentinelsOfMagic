import {parse} from 'cookie';
module.exports = (router) => {
  // router is props.history from a component served by react router
  let cookies = parse(document.cookie);
  console.log(cookies);
  if (!cookies.fridgrSesh) {
    router.push('/login');
    return;
  }

  let fridgrSesh = JSON.parse(cookies.fridgrSesh.slice(2));
  console.log(fridgrSesh);
  if (!(fridgrSesh.userId && fridgrSesh.houseId)) {
    router.push('/login');
  }

};

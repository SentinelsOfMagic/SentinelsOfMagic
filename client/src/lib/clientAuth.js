import {parse} from 'cookie';
module.exports = (router) => {
  // router is props.history from a component served by react router
  let cookies = parse(document.cookie);

  if (!(cookies.fridgrSesh && cookies.fridgrSesh.userId && cookies.fridgrSesh.houseId)) {
    router.push('/login');
  }

};

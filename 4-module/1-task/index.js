function makeFriendsList(friends) {
  let friendsList = friends.map(item => `<li>${item.firstName} ${item.lastName}</li>`);

  let ul = document.createElement('ul');

  ul.innerHTML = friendsList.join('');

  return ul;
}

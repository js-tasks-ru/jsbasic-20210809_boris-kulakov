function namify(users) {
  let nameList = [];
  
  for (let user of users) {
    nameList.push(user.name);
  }

  return nameList;
}

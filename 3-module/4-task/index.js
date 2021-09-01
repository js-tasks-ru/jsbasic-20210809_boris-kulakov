function showSalary(users, age) {
  let filteredUsers = users.filter(user => user.age <= age);

  let salaryList = filteredUsers.map(user => `${user.name}, ${user.balance}`);

  salaryList = salaryList.join('\n');
  
  return salaryList;
}

const Users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/html' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'text/html' });
  response.end();
};


// gets a user
const getUsers = (request, response) => {
  const responseJSON = {
    Users,
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response, status) => {
  respondJSON(request, response, 200);
};


// add a user
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (Users[body.name]) {
    responseCode = 204;
  } else {
    Users[body.name] = {};
  }

  //displays the data from the input
  Users[body.name].name = body.name;
  Users[body.name].age = body.age;
  Users[body.name].comment = body.comment;
  Users[body.name].month = body.month;
  Users[body.name].day = body.day;
  Users[body.name].year = body.year;


  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response, type) => respondJSONMeta(request, response, 404);

module.exports = {
  getUsersMeta,
  notFound,
  notFoundMeta,
  getUsers,
  addUser,
};

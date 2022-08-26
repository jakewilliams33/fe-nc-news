const ErrorPage = (message) => {
  const errorString = message.message
    ? message.message.err.message
    : "Page not found";
  return (
    <>
      <h1>OOPS</h1>
      <img
        alt="cat"
        src="https://i.pinimg.com/originals/cf/be/d9/cfbed93ad1c41ddd9033c824a76df42f.gif"
      ></img>
      <p>{errorString}</p>
    </>
  );
};

export default ErrorPage;

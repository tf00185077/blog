'use client';
export const getServerSideProps = async () => {
  // const response = await fetch('http://localhost:3000/api');
  // const data: { message: string; } = await response.json();
  return { props: { message: '這是get server side props' } };
};
const Test = ({ message }: { message: string; }) => {
  return <>{message}</>;
};
export default Test;
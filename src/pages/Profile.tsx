import User from "../components/User";

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  return (
    <>
      <User user={user} />
    </>
  );
}

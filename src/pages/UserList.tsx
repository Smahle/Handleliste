import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

export default function UserList() {
  const navigate = useNavigate();
  const { users, activeUser, followUser, unfollowUser } = useUserContext();

  return (
    <>
      <h2>All Users</h2>
      {users.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((u) => activeUser?.following?.includes(u.username))
                .map((u) => (
                  <TableRow key={u.username}>
                    <TableCell>
                      <Button
                        onClick={() => navigate(`/profile/${u.username}`)}
                        variant="text"
                        sx={{ textTransform: "none" }}
                      >
                        {u.username}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell align="right">
                      {u.username !== activeUser?.username && (
                        <Button
                          onClick={() =>
                            activeUser?.following?.includes(u.username)
                              ? unfollowUser(u.username)
                              : followUser(u.username)
                          }
                          variant="outlined"
                        >
                          {activeUser?.following?.includes(u.username)
                            ? "Unfollow"
                            : "Follow"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No users found</p>
      )}
    </>
  );
}

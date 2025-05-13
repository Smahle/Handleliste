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

export default function Users() {
  const navigate = useNavigate();
  const { users, activeUser, followUser, unfollowUser } = useUserContext();

  return (
    <>
      {users.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: (theme) => theme.palette.tertiary.main,
            color: (theme) => theme.palette.tertiary.contrastText,
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.dark,
                }}
              >
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.tertiary.contrastText,
                  }}
                >
                  Username
                </TableCell>
                <TableCell
                  sx={{
                    color: (theme) => theme.palette.secondary.contrastText,
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: (theme) => theme.palette.secondary.contrastText,
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((u) => activeUser?.username !== u.username)
                .map((u) => (
                  <TableRow key={u.username}>
                    <TableCell>
                      <Button
                        onClick={() => navigate(`/profile/${u.username}`)}
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: "none" }}
                      >
                        {u.username}
                      </Button>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: (theme) => theme.palette.secondary.contrastText,
                      }}
                    >
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
                          variant="contained"
                          color="primary"
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

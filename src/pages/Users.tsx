import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import styles from "./Users.module.css";
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
    <div className={styles.usersContainer}>
      {users.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            width: "fit-content",
            padding: "1vh",
            margin: "1vh",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: (theme) => theme.palette.tertiary.main,
            color: (theme) => theme.palette.tertiary.contrastText,
          }}
        >
          <Table sx={{ width: "fit-content" }} aria-label="users table">
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
    </div>
  );
}

import { gql, useQuery } from "@apollo/client";
import { Dropdown } from "./Dropdown";
import { Box, Paper, Typography } from "@mui/material";
import theme from "../../../theme/theme.d";

const GET_REQUESTS = gql`
  query CaminRequests {
    caminRequests {
      aplicantName
      applicantFirstName
      applicantEmail
      applicantPhone
      applicantAddress
      applicantCity
      applicantState
      applicantUniversity
      applicantDormitoryPreference
      buletinFrontUrl
      buletinBackUrl
      confirmareStudiiUrl
      createdAt
      userId
      status
      id
    }
  }
`;

export const ApplicationsComponent = () => {
  const { data, loading, error } = useQuery(GET_REQUESTS);

  if (loading) return <Typography>Se încarcă cererile...</Typography>;
  if (error) return <Typography>Eroare la preluarea datelor.</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxHeight: "90vh",
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper,

        boxShadow: 4,
      }}
    >
      {data?.caminRequests.length === 0 ? (
        <Typography variant="body1" align="center">
          Nu există cereri momentan.
        </Typography>
      ) : (
        data.caminRequests.map((request: any) => (
          <Paper
            key={request.id}
            elevation={2}
            sx={{
              mb: 2,
              p: 2,

              backgroundColor: theme.palette.background.default,
            }}
          >
            <Dropdown
              data={request}
              onAccept={(data) => console.log("Acceptat:", data)}
              onDecline={() => console.log("Respins")}
            />
          </Paper>
        ))
      )}
    </Paper>
  );
};

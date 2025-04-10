import { useState } from "react";
import { useForm, FormProvider, set, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Grid2,
  MenuItem,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { formSchema, FormSchema } from "./form.schema";
import { CardCamin } from "./CardCamin";
import { gql, useMutation, useQuery } from "@apollo/client";
import theme from "../../theme/theme.d";

import { FileItem, UploadFileComponent } from "./UploadFileComponent";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import { SectionView } from "./SectionView";
import { CheckBox } from "@mui/icons-material";
import { FORM_MUTATION } from "./mutations";
import { UPLOAD_MUTATION } from "./mutations";

const GET_CAMINS = gql`
  query Camins {
    camins {
      id
      name
      description
      adress
    }
  }
`;

type Camin = {
  id: number;
  name: string;
  description: string;
  adress: string;
};

const StepForm = () => {
  const [formStep, setFormStep] = useState(0);
  const { loading, error, data } = useQuery(GET_CAMINS);
  const [err, setErr] = useState("");
  const [isCaminSelected, setIsCaminSelected] = useState(false);
  const [selectedCamin, setSelectedCamin] = useState(0);
  const [caminError, setCaminError] = useState(false);
  const [IsOtherUniversity, setIsOtherUniversity] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [submitForm, { data: dataForm, error: errForm }] = useMutation(
    FORM_MUTATION,
    {
      onError: (err) => {
        setErr(err.message);
      },
      onCompleted: () => {},
    }
  );

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      university: "",
      dormitoryPreference: "",
      terms: false,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.camins) return <p>No data available</p>;

  const steps = [
    {
      label: "Alegeti caminul",
      description: `Alegeti un camin din lista de camine disponibile.`,
    },
    {
      label: "Introduceti datele personale",
      description:
        "Indeplineste formularul cu datele personale necesare pentru a aplica la camin.",
    },
    {
      label: "Incarcati documentele necesare",
      description: `Incarcati documentele necesare pentru a finaliza aplicatia. Acestea
                pot include buletinul, adeverinta de student, etc.`,
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleNext = async () => {
    if (formStep === 0 && !methods.getValues("dormitoryPreference")) {
      setCaminError(true);
      return;
    }

    if (formStep === 1 && !methods.getValues("firstName")) {
      setCaminError(true);
      return;
    }

    setCaminError(false);
    setFormStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setFormStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSelectCamin = (id: number) => {
    if (selectedCamin === id) {
      setSelectedCamin(0);
      methods.setValue("dormitoryPreference", "");
      setIsCaminSelected(false);
    } else {
      setSelectedCamin(id);
      methods.setValue("dormitoryPreference", id.toString());
      setIsCaminSelected(true);
      setCaminError(false);
    }
  };
  const camins = data.camins;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      console.log("File selected:", file);
    }
  };

  const handleUniversityChange = (e: any) => {
    if (e.target.value === "other") {
      setIsOtherUniversity(true);
    } else {
      setIsOtherUniversity(false);
    }
  };

  const handleFilesChange = (updatedFiles: FileItem[]) => {
    setFiles(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const onSubmit = (data: any) => {
    console.log(files.find((file) => file.fileType === "BuletinBack")?.file);
    try {
      submitForm({
        variables: {
          data: {
            request: {
              aplicantName: data.lastName,
              applicantAddress: data.address,
              applicantCity: data.city,
              applicantDormitoryPreference: data.dormitoryPreference,
              applicantEmail: data.email,
              applicantFirstName: data.firstName,
              applicantPhone: data.phone,
              applicantUniversity: data.university,
              applicantState: "",
            },
            files: {
              fileBuletinBack:
                files.find((file) => file.fileType === "BuletinBack")?.file ||
                null,
              fileBuletinFront:
                files.find((file) => file.fileType === "BuletinFront")?.file ||
                null,
              fileStudyConfirmation:
                files.find((file) => file.fileType === "ConfirmareStudii")
                  ?.file || null,
            },
          },
        },
      });
    } catch (error) {
      setErr("Error on form submit");
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <FormProvider {...methods}>
          <Typography
            sx={{
              fontSize: "3rem",
              color: "text.primary",
              backgroundColor: "background.default",
            }}
            pl={"144px"}
            pt={"24px"}
            pb={"24px"}
            variant="body1"
          >
            Aplicare la camin
          </Typography>
          <Stepper
            sx={{
              padding: "0px 144px",
              width: "100%",
              backgroundColor: "transparent",

              alignItems: "flex-start",

              "& .MuiStep-vertical": {
                pt: "24px",
              },
            }}
            activeStep={formStep}
            orientation="vertical"
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color:
                        formStep === index ? "primary.main" : "text.primary",
                    },
                  }}
                  optional={
                    index === steps.length - 1 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color:
                        formStep === index ? "primary.main" : "text.primary",
                    }}
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  {formStep === 0 && (
                    <div>
                      <Grid2
                        container
                        spacing={2}
                        display={"flex"}
                        direction="row"
                        justifyContent="center"
                      >
                        {camins.map((camin: Camin) => {
                          return (
                            <CardCamin
                              onClick={() => handleSelectCamin(camin.id)}
                              key={camin.id}
                              camin={camin}
                              selected={
                                methods.watch("dormitoryPreference") ===
                                camin.id.toString()
                              }
                            />
                          );
                        })}
                      </Grid2>
                      {caminError && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "error.main",
                            mt: 1,
                            textAlign: "center",
                          }}
                        >
                          Va rugam sa selectati un camin pentru a continua.
                        </Typography>
                      )}
                    </div>
                  )}

                  {formStep === 1 && (
                    <SectionView>
                      <h1>Introduceti datele personale</h1>
                      <Grid container spacing={2} pt={2}>
                        <Controller
                          name="firstName"
                          control={methods.control}
                          render={({ field, fieldState }) => (
                            <Grid item xs={12} sm={6}>
                              <TextField
                                {...field}
                                label="Prenume"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            </Grid>
                          )}
                        />
                        <Controller
                          name="lastName"
                          control={methods.control}
                          render={({ field, fieldState }) => (
                            <Grid item xs={12} sm={6}>
                              <TextField
                                {...field}
                                label="Nume"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            </Grid>
                          )}
                        />
                        <Controller
                          name="email"
                          control={methods.control}
                          render={({ field, fieldState }) => (
                            <Grid item xs={12}>
                              <TextField
                                {...field}
                                label="Email"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            </Grid>
                          )}
                        />
                        <Controller
                          name="phone"
                          control={methods.control}
                          rules={{
                            required: "Numărul de telefon este obligatoriu",
                            validate: (value) =>
                              value.startsWith("373") && value.length >= 11
                                ? true
                                : "Numărul trebuie să fie valid din Moldova (+373)",
                          }}
                          render={({ field, fieldState }) => (
                            <Grid item xs={12}>
                              <PhoneInput
                                prefix="MD +"
                                disableDropdown
                                buttonStyle={{
                                  cursor: "auto",
                                }}
                                showDropdown={false}
                                {...field}
                                countryCodeEditable={false}
                                preferredCountries={["md"]}
                                country={"md"}
                                placeholder="+373 68791183"
                                inputStyle={{ width: "100%" }}
                                onChange={(value) => field.onChange(value)}
                                specialLabel="Telefon"
                                inputProps={{
                                  name: "phone",
                                  required: true,
                                }}
                                containerStyle={{
                                  width: "100%",
                                }}
                              />
                              {fieldState.error && (
                                <Typography color="error" variant="caption">
                                  {fieldState.error.message}
                                </Typography>
                              )}
                            </Grid>
                          )}
                        />
                        <Controller
                          name="city"
                          control={methods.control}
                          render={({ field, fieldState }) => (
                            <Grid item xs={12}>
                              <TextField
                                {...field}
                                label="Orasul de locuinta"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            </Grid>
                          )}
                        />
                        <Controller
                          name="address"
                          control={methods.control}
                          render={({ field, fieldState }) => (
                            <Grid item xs={12}>
                              <TextField
                                {...field}
                                label="Adresa de domiciliu"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            </Grid>
                          )}
                        />
                        <Controller
                          name="university"
                          control={methods.control}
                          rules={{ required: "Selectează o universitate" }}
                          render={({ field, fieldState }) => (
                            <Grid item xs={12}>
                              <TextField
                                {...field}
                                select
                                label="Universitatea"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleUniversityChange(e);
                                }}
                              >
                                <MenuItem value="">Selectează</MenuItem>
                                <MenuItem value="usm">
                                  Universitatea de Stat din Moldova
                                </MenuItem>
                                <MenuItem value="utm">
                                  Universitatea Tehnică a Moldovei
                                </MenuItem>
                                <MenuItem value="ase">
                                  Academia de Studii Economice
                                </MenuItem>
                                <MenuItem value="usmf">
                                  Universitatea de Medicină
                                </MenuItem>
                                <MenuItem value="ulim">ULIM</MenuItem>
                                <MenuItem value="other">
                                  Altă universitate
                                </MenuItem>
                              </TextField>
                            </Grid>
                          )}
                        />

                        {IsOtherUniversity && (
                          <Grid item xs={12}>
                            <TextField
                              label="Numele universității"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              onChange={(e) =>
                                methods.setValue("university", e.target.value)
                              }
                            />
                          </Grid>
                        )}

                        <Controller
                          name="terms"
                          control={methods.control}
                          rules={{
                            required:
                              "Trebuie sa acceptati termenii si conditiile",
                          }}
                          render={({ field, fieldState }) => (
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(e) =>
                                      field.onChange(e.target.checked)
                                    }
                                    color="primary"
                                  />
                                }
                                label="Sunt de-acord cu termenii si conditiile"
                              />
                              {fieldState.invalid && (
                                <FormHelperText error>
                                  {fieldState.error?.message}
                                </FormHelperText>
                              )}
                            </Grid>
                          )}
                        />
                      </Grid>
                    </SectionView>
                  )}

                  {formStep === 2 && (
                    <div>
                      <h1>Incarcati documentele necesare</h1>
                      <Controller
                        name="files"
                        control={control}
                        rules={{
                          validate: (files) =>
                            files?.length > 0 ||
                            "Trebuie să încarci cel puțin un document",
                        }}
                        render={({ field }) => (
                          <UploadFileComponent
                            {...field}
                            files={files}
                            onChange={(updatedFiles) => {
                              setFiles(updatedFiles);
                              field.onChange(updatedFiles);
                            }}
                            onRemove={(index) => {
                              const updatedFiles = [...files];
                              updatedFiles.splice(index, 1);
                              setFiles(updatedFiles);
                              field.onChange(updatedFiles);
                            }}
                          />
                        )}
                      />
                    </div>
                  )}

                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={
                        formStep === steps.length - 1
                          ? handleSubmit(onSubmit)
                          : handleNext
                      }
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {formStep === steps.length - 1
                        ? "Finalizare"
                        : "Urmatorul"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Inapoi
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </FormProvider>
      </ThemeProvider>
    </div>
  );
};

export default StepForm;

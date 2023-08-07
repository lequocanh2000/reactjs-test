import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundLogin  from '../../assets/images/bg-login.jpg'
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
// form
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// icon
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

interface FormValuesProps {
  email: string;
  password: string;
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();


  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Bạn cần nhập email")
      .email("Email phải đúng định dạng"),
    password: Yup.string().required("Bạn cần nhập mật khẩu"),
  });

  const defaultValues = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  const handleLogin = (email: string, password: string) => {
    if (
        email !== defaultValues.email ||
        password !== defaultValues.password
      ) 
        {
            return false;
        }
    return true
  }

  const onSubmit = (data: FormValuesProps) => {
    if(handleLogin(data.email,data.password)){
        console.log("email", data.email);
        console.log("password", data.password);
        navigate("/product-list");
        return;
    }
    setLoginFailed(true);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{background:`url(${backgroundLogin}) no-repeat center / cover`, opacity: 0.9}}
    >
      <Stack
        sx={{ border: "1px solid #ccc", borderRadius: 2, py: 6, px: 6, maxWidth: 400, backgroundColor:"#fff"}}
        spacing={3}
      >
        <Typography textAlign="center" variant="h5" fontWeight={600}>
          Đăng nhập
        </Typography>
        {loginFailed && <Alert severity="error">
          {"Tài khoản hoặc mật khẩu không chính xác"}
        </Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type="email"
                      value={value}
                      label="Email"
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="carterleonard@gmail.com"
                      aria-describedby="validation-schema-email"
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-schema-email"
                  >
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="validation-schema-password"
                  error={Boolean(errors.password)}
                >
                  Mật khẩu
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label="Mật khẩu"
                      onChange={onChange}
                      id="validation-schema-password"
                      error={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowPassword}
                            onMouseDown={(e) => handleMouseDownPassword(e)}
                            aria-label="toggle password visibility"
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-schema-password"
                  >
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button size="large" type="submit" variant="contained" fullWidth>
                Đăng nhập
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Stack>
  );
}

export default Login;

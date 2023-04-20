import { Typography } from "@mui/material";
import {
  Container,
  DataGrid,
  errorHandler,
  useAxios,
} from "@neostella/neostella-ui";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import tableName from "../../../../constants/table-name";

export default function Tenants() {
  const [t] = useTranslation();
  const history = useHistory();
  const [tenantsList, setTenantsList] = useState<any[] | null>(null);
  const [currenciesList, setCurrenciesList] = useState<any[] | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const axiosInstance = useAxios();

  const getTenantsAndCurrencies = async () => {
    try {
      const res1 = await axiosInstance.get("newtenants");
      setTenantsList(res1.data.tenants);
      const res2 = await axiosInstance.get("newtenants");
      setCurrenciesList(res2.data.currencies);
    } catch (e) {
      errorHandler(e, enqueueSnackbar, t);
    }
  };

  useEffect(() => {
    getTenantsAndCurrencies();
  }, []);
  return (
    <Container title="Tenants" onBack={() => history.goBack()}>
      <Typography>Available Currencies</Typography>
      <ul>
        {currenciesList?.map((currency) => (
          <li>{currency.name}</li>
        ))}
      </ul>
      <DataGrid
        sx={{ BorderColor: "#0077ce !important" }}
        tableName={tableName.tenants}
        columns={[
          {
            field: "tenant_name",
            headerName: "Company Name",
            flex: 1,
          },
          {
            field: "currencies",
            headerName: "Currencies",
            flex: 1,
          },
        ]}
        quickFilter
        rows={tenantsList || []}
      />
    </Container>
  );
}

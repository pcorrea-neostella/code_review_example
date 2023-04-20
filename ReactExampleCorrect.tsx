import { Typography, useTheme } from "@mui/material";
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

interface TenantsResp {
  correlation_id: string;
  tenants: Tenant[];
}

interface Tenant {
  tenant_id: string;
  tenant_name: string;
  is_active: boolean;
  admin_first_name: string;
  admin_last_name: string;
  subdomain: string;
  activation_date: string;
  admin_email: string;
  status: string;
  created_by: string;
  created_at: Date;
  updated_by: string;
  updated_at: Date;
}
interface CurrenciesResp {
  correlation_id: string;
  currencies: Currencies[];
}

interface Currencies {
  id: string;
  name: string;
}

export default function Tenants() {
  const [t] = useTranslation();
  const history = useHistory();
  const [tenantsList, setTenantsList] = useState<Tenant[] | null>(null);
  const [currenciesList, setCurrenciesList] = useState<Currencies[] | null>(
    null
  );
  const { palette } = useTheme();

  const { enqueueSnackbar } = useSnackbar();
  const axiosInstance = useAxios();

  const getTenantsAndCurrencies = async () => {
    const results = await Promise.allSettled([
      axiosInstance.get<TenantsResp>("newtenants"),
      axiosInstance.get<CurrenciesResp>("roles?data=roles-permissions"),
    ]);
    const [tenantsData, currenciesData] = results;
    if (tenantsData.status === "fulfilled") {
      setTenantsList(tenantsData.value.data.tenants);
    } else {
      errorHandler(tenantsData.reason, enqueueSnackbar, t);
    }
    if (currenciesData.status === "fulfilled") {
      setCurrenciesList(currenciesData.value.data.currencies);
    } else {
      errorHandler(currenciesData.reason, enqueueSnackbar, t);
    }

    try {
      const { data } = await axiosInstance.get<TenantsResp>("newtenants");
      setTenantsList(data.tenants);
    } catch (e) {
      errorHandler(e, enqueueSnackbar, t);
    }
  };

  useEffect(() => {
    getTenantsAndCurrencies();
  }, []);
  return (
    <Container
      title={t("general.tenants")}
      onBack={() => history.push("/admin")}
    >
      <Typography>Available Currencies</Typography>
      <ul>
        {currenciesList?.map((currency) => (
          <li key={currency.id}>{currency.name}</li>
        ))}
      </ul>
      <DataGrid
        sx={{ BorderColor: palette.primary.main }}
        tableName={tableName.tenants}
        columns={[
          {
            field: "tenant_name",
            headerName: t("general.company_name"),
            flex: 1,
          },
          {
            field: "currencies",
            headerName: t("admin.neo_url"),
            flex: 1,
          },
        ]}
        quickFilter
        rows={tenantsList || []}
      />
    </Container>
  );
}

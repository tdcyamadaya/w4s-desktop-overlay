import RefreshIcon from "@mui/icons-material/Refresh";
import {IconButton} from "@mui/material";

export const AllReloadButton = () => {
  const reloadAll = () => {
    window.api.reloadAll();
  };

  return (
    <IconButton
      size='small'
      onClick={reloadAll}
      color='primary'
      title='Reload All Layers'
    >
      <RefreshIcon />
    </IconButton>
  );
};

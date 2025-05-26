import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {ButtonGroup, IconButton} from "@mui/material";

export type ZoomControlProps = {
  id: string;
};

export const ZoomControl = ({id}: ZoomControlProps) => {
  const zoomIn = () => {
    window.api.zoomIn(id);
  };

  const zoomOut = () => {
    window.api.zoomOut(id);
  };

  return (
    <ButtonGroup
      sx={{flex: 0}}
      variant='contained'
      color='primary'
      size='small'
      disableElevation
    >
      <IconButton size='small' onClick={zoomOut}>
        <ZoomOutIcon />
      </IconButton>
      <IconButton size='small' onClick={zoomIn}>
        <ZoomInIcon />
      </IconButton>
    </ButtonGroup>
  );
};

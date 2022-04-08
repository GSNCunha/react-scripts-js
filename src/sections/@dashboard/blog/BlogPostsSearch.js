import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import './modal.css';

import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Link,
  Typography,
  Autocomplete,
  InputAdornment,
  Popper,
  Stack,
  TextField,
  DialogTitle,
  Card,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { DialogAnimate } from 'src/components/animate';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import SearchNotFound from '../../../components/SearchNotFound';
import { Data } from '../../../components/img/desktopSearch';
import BasicModal from './BasicModal';

const data = Data;
// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

export default function BlogPostsSearch() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState('');

  const [queryPath, setQueryPath] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (value) => {
    try {
      setSearchQuery(value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (name) => {
    console.log(name);
    navigate(PATH_DASHBOARD.blog.view(paramCase(name)));
    handleOpen();
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
      // eslint-disable-next-line no-plusplus
      for (let y = 0; y < data.length; y++) {
        // eslint-disable-next-line no-empty
        if (data[y].name === searchQuery) {
          // eslint-disable-next-line no-empty
          setQueryPath(data[y].path);
          break;
        }
      }
    }
  };
  return (
    <div>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          size="small"
          autoHighlight
          popupIcon={null}
          PopperComponent={PopperStyle}
          onInputChange={(event, value) => handleChangeSearch(value)}
          noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
          id="inclusive-Layouts"
          disableClearable
          options={data.map((option) => option.name)}
          renderInput={(params) => (
            <InputStyle
              {...params}
              stretchStart={200}
              placeholder="Search post..."
              onKeyUp={handleKeyUp}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <span className="modal-header d-flex justify-content-between mx-1 mx-sm-3 mb-0 pb-0 border-0">
              <div className="tabs active" id="tab01">
                <h6 className="text-muted">My Apps</h6>
              </div>
              <div className="tabs" id="tab02">
                <h6 className="text-muted">Knowledge Center</h6>
              </div>
              <div className="tabs" id="tab03">
                <h6 className="text-muted">Communities</h6>
              </div>
              <div className="tabs" id="tab04">
                <h6 className="text-muted">Education</h6>
              </div>
            </span>
          </div>
          <DialogTitle>{searchQuery}</DialogTitle>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <Image alt="cover" src={queryPath} ratio="4/3" />
            </Box>
          </Card>
          <Button onClick={handleClose}>&times;</Button>
        </Box>
      </Modal>
    </div>
  );
}

/*
  data.map((x) => {
    if (1) {
      return (
        <li key={x.name}>
          <Image alt="1" src={x.path} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} />
          <Typography key={1} component="span" variant="subtitle2" color="textPrimary">
            {x.name}
          </Typography>
        </li>
      );
    }
    return 0;
  });
*/

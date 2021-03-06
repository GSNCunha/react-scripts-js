import * as React from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Avatar,
  Typography,
  CardContent,
  Stack,
  Button,
  Modal,
  DialogTitle,
  Tab,
  Tabs,
  AppBar,
  Fab,
  Grid,
  Paper,
} from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import TextIconLabel from '../../../components/TextIconLabel';
import SvgIconStyle from '../../../components/SvgIconStyle';
import BasicModal from './BasicModal';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};
const backgroundColorBlack = {
  bgcolor: 'black',
  color: 'success.main',
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  const [open, setOpen] = React.useState(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  };
  const [value, setValue] = React.useState('1');

  const theme = useTheme();

  const handleChangeModal = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isDesktop = useResponsive('up', 'md');

  const latestPost = index === 0 || index === 1 || index === 2;

  if (isDesktop && latestPost) {
    return (
      <div>
        <Card onClick={handleOpen}>
          <Avatar
            alt="Marcelo Paiva"
            src="https://taylor.tulane.edu/wp-content/uploads/2020/11/marcelo_paiva.jpg"
            sx={{
              zIndex: 9,
              top: 24,
              left: 24,
              width: 40,
              height: 40,
              position: 'absolute',
            }}
          />
          <PostContent title={post.name} view={1} comment={1} share={1} createdAt={1} index={index} />
          <OverlayStyle />
          <Image alt="cover" src={post.path} sx={{ height: 360 }} />
        </Card>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Fab variant="extended" sx={fabStyle} onClick={handleClose}>
                  Close
                </Fab>
                <TabList onChange={handleChangeModal} variant="fullWidth" aria-label="lab API tabs example">
                  <Tab label="Details" value="1" />
                  <Tab label="Design" value="2" />
                  <Tab label="Code" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <DialogTitle variant="h3" align="center">
                  {post.name}
                </DialogTitle>

                <Box>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Item>
                        <Card>
                          <Box sx={{ position: 'relative' }}>
                            <Image alt="cover" src={post.path} ratio="4/3" />
                          </Box>
                        </Card>
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <h5 align="center">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident incidunt et sunt a officia
                      </h5>
                    </Grid>
                  </Grid>
                  <DialogTitle variant="h5" align="center">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident incidunt et sunt a officia quos
                    dolor dolorum ex facere, molestiae, voluptatem debitis animi nulla at. Ut sunt ab consequuntur
                    accusantium?
                  </DialogTitle>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <DialogTitle variant="h3" align="center">
                  {post.name}
                </DialogTitle>
                <Card>
                  <Box sx={{ position: 'relative' }}>
                    <Image alt="cover" src={post.path} ratio="4/3" />
                  </Box>
                </Card>
              </TabPanel>
              <TabPanel value="3">
                <DialogTitle variant="h3" align="center">
                  {post.name}
                </DialogTitle>
                <Card sx={backgroundColorBlack}>
                  <pre>
                    {`
  <TabPanel value="1">
    <DialogTitle>{post.name}</DialogTitle>
    <Card onClick={handleOpen}>
    <Box sx={{ position: 'relative' }}>
      <Image alt="cover" src={post.path} ratio="4/3" />
    </Box>
    </Card>
  </TabPanel>`}
                  </pre>
                </Card>
              </TabPanel>
            </TabContext>
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Card onClick={handleOpen}>
        <Box sx={{ position: 'relative' }}>
          <SvgIconStyle
            src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />
          <Avatar
            alt="Marcelo Paiva"
            src="https://taylor.tulane.edu/wp-content/uploads/2020/11/marcelo_paiva.jpg"
            sx={{
              left: 24,
              zIndex: 9,
              width: 32,
              height: 32,
              bottom: -16,
              position: 'absolute',
            }}
          />
          <Image alt="cover" src={post.path} ratio="4/3" />
        </Box>

        <PostContent title={post.name} view={1} comment={1} share={1} createdAt={1} index={index} />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Fab variant="extended" sx={fabStyle} onClick={handleClose}>
            Close
          </Fab>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeModal} variant="fullWidth" aria-label="lab API tabs example">
                <Tab label="Details" value="1" />
                <Tab label="Design" value="2" />
                <Tab label="Code" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <DialogTitle variant="h3" align="center">
                {post.name}
              </DialogTitle>

              <Box>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <Item>
                      <Card>
                        <Box sx={{ position: 'relative' }}>
                          <Image alt="cover" src={post.path} ratio="4/3" />
                        </Box>
                      </Card>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <DialogTitle variant="h5" align="center">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident incidunt et sunt a officia
                    </DialogTitle>
                  </Grid>
                </Grid>
                <DialogTitle variant="h5" align="center">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident incidunt et sunt a officia quos
                  dolor dolorum ex facere, molestiae, voluptatem debitis animi nulla at. Ut sunt ab consequuntur
                  accusantium?
                </DialogTitle>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <DialogTitle variant="h3" align="center">
                {post.name}
              </DialogTitle>
              <Card>
                <Box sx={{ position: 'relative' }}>
                  <Image alt="cover" src={post.path} ratio="4/3" />
                </Box>
              </Card>
            </TabPanel>
            <TabPanel value="3">
              <DialogTitle variant="h3" align="center">
                {post.name}
              </DialogTitle>
              <Card sx={backgroundColorBlack}>
                <pre>
                  {`
  <TabPanel value="1">
    <DialogTitle>{post.name}</DialogTitle>
    <Card onClick={handleOpen}>
    <Box sx={{ position: 'relative' }}>
      <Image alt="cover" src={post.path} ratio="4/3" />
    </Box>
    </Card>
  </TabPanel>`}
                </pre>
              </Card>
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  comment: PropTypes.number,
  createdAt: PropTypes.string,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  view: PropTypes.number,
};

export function PostContent({ title, view, comment, share, createdAt, index }) {
  const isDesktop = useResponsive('up', 'md');

  const linkTo = PATH_DASHBOARD.blog.view(paramCase(title));

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link to={linkTo} color="inherit" component={RouterLink}>
        <TextMaxLine variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'} line={2} persistent>
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}

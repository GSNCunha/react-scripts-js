import * as React from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack, Button, Modal, DialogTitle } from '@mui/material';
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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

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
            <DialogTitle>{post.name}</DialogTitle>
            <Card onClick={handleOpen}>
              <Box sx={{ position: 'relative' }}>
                <Image alt="cover" src={post.path} ratio="4/3" />
              </Box>
            </Card>
            <Button onClick={handleClose}>x</Button>
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
          <DialogTitle>{post.name}</DialogTitle>
          <Card onClick={handleOpen}>
            <Box sx={{ position: 'relative' }}>
              <Image alt="cover" src={post.path} ratio="4/3" />
            </Box>
          </Card>
          <Button onClick={handleClose}>x</Button>
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

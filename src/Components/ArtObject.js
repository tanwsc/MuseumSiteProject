import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "./Modal.js";

// classifications
// 17 - photographs
// 21 - drawings
// 23 - prints
// 26 - paintings
// 80 - paintings with calligraphy

// mediums
// 2028195 - ink
// 2028177 - oil
// 2028387 - textile materials
// 2028206 - watercolour
// 2028955 - ink and opaque watercolour

const ArtObject = ({ style, url }) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(1);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  const apikey = process.env.REACT_APP_APIKEY;
  const harvardArtMuseumUrl = `https://api.harvardartmuseums.org/object?apikey=${apikey}${url}&size=5&page=${click}`;

  //////////////////////////////////////////////////////////////// fetch api
  useEffect(() => {
    setData([]);
    setCurrent(0);
    const makeAPICall = async () => {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://api.harvardartmuseums.org/object?apikey=${apikey}${url}&size=5&page=${click}`
        );
        const museum = await res.json();
        setStatus("resolved");
        // console.log(museum.records);

        //////////////////////////////////////////////////////////////// filter data
        // if key + value exist
        // not null || undefined || empty
        const filterData = museum.records.filter((r) => {
          if (!r.hasOwnProperty("images") || r.images.length === 0) {
            return false;
          }
          return true;
        });
        console.log(filterData);

        if (filterData.length === 0) {
          return setClick((prev) => prev + 1);
        }

        // find artist name if exists
        for (let obj of filterData) {
          if (obj.hasOwnProperty("people") && obj.people[0].length !== 0) {
            const artists = [];
            for (let p of obj.people) {
              artists.push(p.name);
            }
            setData((data) => [
              ...data,
              {
                title: obj.title,
                artist: artists.join(", "),
                culture: obj.culture,
                period: obj.period,
                date: obj.dated,
                classification: obj.classification,
                medium: obj.medium,
                dimensions: obj.dimensions,
                description: obj.description,
                baseImg: `${obj.images[0].iiifbaseuri}/full/full/0/default.jpg`,
                image: `${obj.images[0].iiifbaseuri}/full/pct:50/0/default.jpg`,
              },
            ]);
          } else {
            setData((data) => [
              ...data,
              {
                title: obj.title,
                culture: obj.culture,
                period: obj.period,
                date: obj.dated,
                classification: obj.classification,
                medium: obj.medium,
                dimensions: obj.dimensions,
                description: obj.description,
                baseImg: `${obj.images[0].iiifbaseuri}/full/full/0/default.jpg`,
                image: `${obj.images[0].iiifbaseuri}/full/pct:50/0/default.jpg`,
              },
            ]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    makeAPICall();
  }, [harvardArtMuseumUrl, click, url, apikey]);
  console.log(data);

  //////////////////////////////////////////////////////////////// navigate obj
  // when next, render next obj in arr
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % data.length);
  };
  // prev, render previous
  const handlePrev = () => {
    setCurrent(
      current === 0 ? data.length - 1 : (prev) => (prev - 1) % data.length
    );
  };
  // change old set with new set
  const handleNewSet = () => {
    setCurrent(0);
    setData([]);
    setClick((prev) => prev + 1);
  };

  // enlarge image
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //////////////////////////////////////////////////////////////// render
  // display status
  const display = () => {
    if (status === "idle") {
      return null;
    } else if (status === "loading") {
      return (
        <Container className={style.loading}>
          <CircularProgress />
        </Container>
      );
    } else if (status === "resolved") {
      console.log("resolved");
      // console.log(data);
      return (
        <>
          <Grid container className={style.artMain}>
            <Grid item sm={12} md={4}>
              <Container className={style.artInfo}>
                <Typography variant="h3" className={style.artHeader}>
                  {data?.[current]?.title}
                </Typography>
                {data?.[current]?.description !== null ? (
                  <Container className={style.artData}>
                    <Typography variant="body1">
                      <span>Description</span>
                      <br />
                      {data?.[current]?.description}
                    </Typography>
                  </Container>
                ) : null}
                {data?.[current]?.date !== null ? (
                  <Container className={style.artData}>
                    <Typography variant="body1">
                      <span>Date</span>
                      <br />
                      {data?.[current]?.date}
                    </Typography>
                  </Container>
                ) : null}
                {data?.[current]?.hasOwnProperty("artist") &&
                data?.[current]?.artist !== null ? (
                  <Container className={style.artData}>
                    <Typography variant="body1">
                      <span>Artist/s</span>
                      <br />
                      {data?.[current]?.artist}
                    </Typography>
                  </Container>
                ) : null}
                {data?.[current]?.classification !== null ? (
                  <Container className={style.artData}>
                    <Typography variant="body1">
                      <span>Classification</span>
                      <br />
                      {data?.[current]?.classification}
                    </Typography>
                  </Container>
                ) : null}
                {data?.[current]?.culture !== null ? (
                  <Container className={style.artData}>
                    <Typography variant="body1">
                      <span>Culture</span>
                      <br />
                      {data?.[current]?.culture}
                    </Typography>
                  </Container>
                ) : null}
                {data?.[current]?.period !== null ? (
                  <Container className={style.artData}>
                    <Typography variant="body1">
                      <span>Period</span>
                      <br />
                      {data?.[current]?.period}
                    </Typography>
                  </Container>
                ) : null}
                {data?.[current]?.medium !== null ? (
                  <Container className={style.artData}>
                    <Typography variant="body1">
                      <span>Medium</span>
                      <br />
                      {data?.[current]?.medium}
                    </Typography>
                  </Container>
                ) : null}
                {data?.[current]?.dimensions !== null ? (
                  <Container className={style.artData}>
                    <Typography variant="body1">
                      <span>Dimensions</span>
                      <br />
                      {data?.[current]?.dimensions}
                    </Typography>
                  </Container>
                ) : null}
              </Container>
            </Grid>
            <Grid item sm={1} md={1}>
              <Button className={style.artButton} onClick={handlePrev}>
                {"<"}
              </Button>
            </Grid>
            <Grid item sm={10} md={6} className="artImage">
              <Button className={style.button} onClick={handleNewSet}>
                New Set
              </Button>
              <Typography variant="body1">
                {current + 1} / {data.length}
              </Typography>
              <img
                src={data?.[current]?.image}
                alt="Apologies, not found"
                onClick={handleOpen}
              />
              <Modal
                imgOpen={open}
                imgClose={handleClose}
                style={style}
                img={data?.[current]?.baseImg}
              />
            </Grid>
            <Grid item sm={1} md={1}>
              <Button className={style.artButton} onClick={handleNext}>
                {">"}
              </Button>
            </Grid>
          </Grid>
        </>
      );
    }
  };

  return <>{display()}</>;
};

export default ArtObject;

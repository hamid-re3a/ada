import React from "react";
import {Container, Segment, Grid, Image, Divider} from "semantic-ui-react";
import Template from "comps/Template";


function About() {
  return (
    <Template>
      <Container style={{ padding: 32 }}>
        <Segment raised style={{ padding: 32 }}>
          <Grid>
            <Grid.Column mobile={16} computer={5}>
              <Segment>
                <Image src='/img/corridor4.jpg' style={styles.img} />
              </Segment>
              <Segment>
                <Image src='/img/flags.jpg' style={styles.img} />
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} computer={11}>
              <Divider horizontal>Adak Spa</Divider>

              <p>
                آداک اسپا ارائه دهنده تمامی سبک های تای طبق دستورالعمل مدرسه بین المللی phenkhae. به مدیریت مرتضی بابالو و تحت نظر استاد کیانی آذر
</p>
              <p>
                پس از سال ها اندیشه تامل و گذراندن دوره های فراوان و خاص و شاگردی کردن در محضر اساتید بزرگ در سبک تای  توانسته ایم اندکی از حس و حال خاور دور را در کشور عزیزمان برای هموطنان عزیز ارائه دهیم
          </p>
              <br />
              <Divider horizontal>
                تیم ما
          </Divider>
              <p>مجموعه ای از توانمندان در حیطه ماساژ می توانند لذت انواع سبک های تای را به شکل اصیل Thai به شما معرفی کنند</p>
              <br />
              <Divider horizontal>
                هدف ما
          </Divider>
              <p>انجام صحیح و سنتی ماساژ به سبک تای برای سلامت و رضایتمندی شما علاقه مندان به این مبحث</p>
              <br />
              <Divider horizontal>
                همکاران ما
          </Divider>
              <p>
                آموزشگاه آرامش سبز به مدیریت جناب آقای استاد کیانی آذر
      آدرس : فلکه دوم صادقیه ،اشرفی اصفهانی، بالاتر از جلال آل احمد (لاین کندرو) ، کوچه محمدی، ساختمان ارغوان یک واحد ۶
      تلفن تماس : ۴۴۲۷۳۵۶۷ ، ۴۴۲۷۳۵۶۶
          </p>
              <div style={{ clear: 'both' }}></div>
            </Grid.Column>
          </Grid>

        </Segment>
      </Container>
    </Template>
  );
}

const styles = {
  leftside: {
    display: 'inline-block',
    float: 'left',
  },
  img: {
    width: 324,
  },
};

export default About;
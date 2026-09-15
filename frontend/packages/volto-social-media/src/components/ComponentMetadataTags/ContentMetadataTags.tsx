import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { toPublicURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import { getNavroot } from '@plone/volto/actions/navroot/navroot';
import config from '@plone/volto/registry';
import { useSocialMedia } from '../../hooks/useSocialMedia';

type ImageScale = {
  download: string;
  width: number;
  height: number;
};

type ImageField =
  | {
      scales?: {
        large?: ImageScale;
      };
    }
  | null
  | undefined;

/** The fields of the content the tags are built from. */
export interface MetadataContent {
  '@id': string;
  title?: string;
  description?: string;
  opengraph_title?: string;
  opengraph_description?: string;
  opengraph_image?: ImageField;
  seo_title?: string;
  seo_description?: string;
  seo_canonical_url?: string;
  seo_noindex?: boolean;
  [field: string]: unknown;
}

export interface ContentMetadataTagsProps {
  content: MetadataContent;
}

type State = {
  router: {
    location: {
      pathname: string;
    };
  };
  navroot?: {
    data?: {
      navroot?: {
        title?: string;
      };
    };
  };
  site?: {
    data?: Record<string, string | undefined>;
  };
};

type ImageInfo = {
  contentHasImage: string | false;
  url: string | null;
  height: number | null;
  width: number | null;
};

type Action = Parameters<ReturnType<typeof useDispatch>>[0];

/** Soft hyphens, which break long words in a heading but not in a tab. */
const SOFT_HYPHENS = new RegExp(String.fromCharCode(0x00ad), 'g');

const ContentMetadataTags: React.FC<ContentMetadataTagsProps> = (props) => {
  const {
    opengraph_title,
    opengraph_description,
    seo_title,
    seo_description,
    seo_canonical_url,
    seo_noindex,
    title,
    description,
  } = props.content;

  const dispatch = useDispatch();
  const pathname = useSelector(
    (state: State) => state.router.location.pathname,
  );
  const navroot = useSelector((state: State) => state.navroot?.data?.navroot);
  const site = useSelector((state: State) => state.site?.data);
  const socialMediaSettings = useSocialMedia();
  const { share_social_data, facebook_app_id, facebook_username, x_username } =
    socialMediaSettings;

  useEffect(() => {
    if (pathname && !hasApiExpander('navroot', getBaseUrl(pathname))) {
      dispatch(getNavroot(getBaseUrl(pathname)) as Action);
    }
  }, [dispatch, pathname]);

  const getContentImageInfo = (): ImageInfo => {
    const { contentMetadataTagsImageField } = config.settings;
    const image = props.content[contentMetadataTagsImageField] as ImageField;
    const { opengraph_image } = props.content;

    const contentHasImage =
      opengraph_image?.scales?.large?.download ||
      image?.scales?.large?.download ||
      false;
    // The Open Graph image wins over the content's own.
    const large = contentHasImage
      ? opengraph_image?.scales?.large ?? image?.scales?.large
      : undefined;

    return {
      contentHasImage,
      url: large?.download ?? null,
      height: large?.height ?? null,
      width: large?.width ?? null,
    };
  };

  const contentImageInfo = getContentImageInfo();

  const getTitle = () => {
    // Volto keeps the separator in `siteTitleFormat`, beside the switch.
    const { siteTitleFormat } = config.settings;
    const includeSiteTitle = siteTitleFormat?.includeSiteTitle || false;
    const titleAndSiteTitleSeparator =
      siteTitleFormat?.titleAndSiteTitleSeparator || '-';
    const navRootTitle = navroot?.title;
    const siteRootTitle = site?.['plone.site_title'];
    const titlePart = navRootTitle || siteRootTitle;

    if (includeSiteTitle && titlePart && titlePart !== title) {
      return seo_title || `${title} ${titleAndSiteTitleSeparator} ${titlePart}`;
    } else {
      return seo_title || title;
    }
  };

  return (
    <>
      <Helmet>
        <title>{getTitle()?.replace(SOFT_HYPHENS, '')}</title>
        <link
          rel="canonical"
          href={seo_canonical_url || toPublicURL(props.content['@id'])}
        />
        <meta name="description" content={seo_description || description} />
        {share_social_data && facebook_app_id && (
          <meta property="fb:app_id" content={facebook_app_id} />
        )}
        {share_social_data && facebook_username && (
          <meta property="og:article:publisher" content={facebook_username} />
        )}
        {share_social_data && x_username && (
          <meta name="twitter:site" content={`@${x_username}`} />
        )}
        <meta
          property="og:title"
          content={opengraph_title || seo_title || title}
        />
        <meta
          property="og:url"
          content={seo_canonical_url || toPublicURL(props.content['@id'])}
        />
        {seo_noindex && <meta name="robots" content="noindex" />}
        {contentImageInfo.contentHasImage && (
          <meta
            property="og:image"
            content={toPublicURL(contentImageInfo.url ?? '')}
          />
        )}
        {contentImageInfo.contentHasImage && (
          <meta
            property="og:image:width"
            content={String(contentImageInfo.width)}
          />
        )}
        {contentImageInfo.contentHasImage && (
          <meta
            property="og:image:height"
            content={String(contentImageInfo.height)}
          />
        )}
        {(opengraph_description || seo_description || description) && (
          <meta
            property="og:description"
            content={opengraph_description || seo_description || description}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    </>
  );
};

export default ContentMetadataTags;

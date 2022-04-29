import TextButton from '@components/buttons/text_button';
import LastDmMessage from '@components/last_dm_message';
import './style/index.scss';
import add from 'toSvg/add.svg?icon';
import color from '@assets/styles/color';
import { css } from '@emotion/react';
interface DmHistoryProps {
  lastDmMessage: Array<any>;
  height: number | string;
}
export default function DmHistory({
  lastDmMessage = [],
  height = 500,
}: DmHistoryProps) {
  return (
    <div
      className="dm-history"
      css={css`
        height: ${typeof height === 'number' ? `${height}px` : ''};
        height: ${typeof height === 'string'
          ? height == '100%'
            ? 'unset'
            : `${height}`
          : ''};
      `}
    >
      <div className="header">
        <span>DM’s</span>
        <TextButton
          Icon={add}
          afterBgColor={color.darkersec_color}
          fontSize={30}
          width={'100%'}
          fontWeight={100}
          radius={7}
          padding={'15px'}
        />
      </div>
      <div className="lastDmMessages-container">
        {lastDmMessage.length > 0
          ? lastDmMessage.map(({ imgSrc, lastMessage, status }, index) => (
              <LastDmMessage
                imgSrc={imgSrc}
                lastMessage={lastMessage}
                status={status}
                key={index}
              />
            ))
          : 'No DM’s messages '}
      </div>
    </div>
  );
}

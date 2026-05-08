import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from '@plone/components';
import { Text } from 'react-aria-components';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { applySchemaDefaults } from '@plone/volto/helpers/Blocks/Blocks';
import { reorderArray } from '@plone/volto/helpers/Utils/Utils';
import AnimateHeight from 'react-animate-height';
import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';
import DndSortableList from '../../../helpers/DndSortableList';
import cx from 'classnames';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { v4 as uuid } from 'uuid';
import type { BlockConfigBase, Content, JSONSchema } from '@plone/types';
import type { IntlShape } from 'react-intl';
import config from '@plone/volto/registry';
import isEmpty from 'lodash/isEmpty';

const messages = defineMessages({
  labelRemoveItem: {
    id: 'Remove item',
    defaultMessage: 'Remove item',
  },
  labelCollapseItem: {
    id: 'Collapse item',
    defaultMessage: 'Collapse item',
  },
  labelShowItem: {
    id: 'Show item',
    defaultMessage: 'Show item',
  },
  emptyObjectList: {
    id: 'Empty object list',
    defaultMessage: 'Empty object list',
  },
  add: {
    id: 'Add (object list)',
    defaultMessage: 'Add',
  },
});

export type ObjectListWidgetSchema =
  | (JSONSchema & { addMessage: string })
  | ((props: ObjectListWidgetProps) => JSONSchema & { addMessage: string });

export type ObjectListWidgetProps = {
  id: string;
  block: string;
  fieldSet: string;
  title: string;
  value?: Array<Record<string, any>>;
  default?: string | object;
  required?: boolean;
  missing_value?: unknown;
  className?: string;
  onChange: (id: string, value: any) => void;
  activeObject: number;
  setActiveObject: (index: number) => void;
  schema?: ObjectListWidgetSchema;
  schemaName?: string | undefined;
  schemaEnhancer?: (args: {
    schema: JSONSchema & { addMessage: string };
    formData: BlockConfigBase;
    intl: IntlShape;
    navRoot: Content;
    contentType: string;
  }) => JSONSchema;
};

const EMPTY_SCHEMA = {
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [],
    },
  ],
  properties: {},
  required: [],
};

const SocialMediaObjectList = (
  props: ObjectListWidgetProps,
): React.ReactElement => {
  const {
    block,
    fieldSet,
    id,
    value = [],
    onChange,
    schemaEnhancer,
    schemaName,
  } = props;

  const schema: JSONSchema & { addMessage: string } =
    config.getUtility({
      type: 'schema',
      name: schemaName || '',
    }).method ||
    (props.schema as JSONSchema & { addMessage: string }) ||
    EMPTY_SCHEMA;

  const [localActiveObject, setLocalActiveObject] = useState<number>(
    props.activeObject ?? value?.length - 1,
  );

  let activeObject: number;
  let setActiveObject: (index: number) => void;
  if (
    (props.activeObject || props.activeObject === 0) &&
    props.setActiveObject
  ) {
    activeObject = props.activeObject;
    setActiveObject = props.setActiveObject;
  } else {
    activeObject = localActiveObject;
    setActiveObject = setLocalActiveObject;
  }

  const intl = useIntl();

  function handleChangeActiveObject(index: number): void {
    const newIndex = activeObject === index ? -1 : index;

    setActiveObject(newIndex);
  }

  const objectSchema: JSONSchema & { addMessage: string } =
    typeof schema === 'function' ? schema({ ...props, activeObject }) : schema;

  function handleDragEnd(event: any): void {
    const { active, over } = event;

    if (active.id !== over.id) {
      const source = value.findIndex((item) => item['@id'] === active.id);
      const destination = value.findIndex((item) => item['@id'] === over.id);

      const newValue = reorderArray(value, source, destination);
      onChange(id, newValue);
    }
  }

  return (
    <div className="object-list-widget">
      <FormFieldWrapper {...props} noForInFieldLabel className="objectlist">
        <div className="add-item-button-wrapper">
          <Button
            aria-label={
              objectSchema.addMessage ||
              `${intl.formatMessage(messages.add)} ${objectSchema.title}`
            }
            onPress={() => {
              const data = {
                '@id': uuid(),
              };

              const objSchema = schemaEnhancer
                ? // @ts-ignore - TODO Make sure this continues to have sense
                  schemaEnhancer({ schema: objectSchema, formData: data, intl })
                : objectSchema;
              const dataWithDefaults = applySchemaDefaults({
                data,
                schema: objSchema,
                intl,
              });

              onChange(id, [...(value || []), dataWithDefaults]);
              setActiveObject(value?.length || 0);
            }}
          >
            <Icon name={addSVG} size="18px" />
            <Text>
              {objectSchema.addMessage ||
                `${intl.formatMessage(messages.add)} ${objectSchema.title}`}
            </Text>
          </Button>
        </div>
        {value?.length === 0 && (
          <input
            aria-labelledby={`fieldset-${
              fieldSet || 'default'
            }-field-label-${id}`}
            type="hidden"
            value={intl.formatMessage(messages.emptyObjectList)}
          />
        )}
      </FormFieldWrapper>
      {!isEmpty(value) && (
        <DndSortableList
          items={value || []}
          handleDragEnd={handleDragEnd}
          activeObject={activeObject}
          setActiveObject={setActiveObject}
        >
          {({
            item,
            uid,
            index,
            attributes,
            listeners,
          }: {
            item: Record<string, any>;
            uid: string;
            index: number;
            attributes: any;
            listeners: any;
          }): React.ReactElement => {
            return (
              <div
                className={cx('olw-item-wrapper', {
                  active: activeObject === index,
                })}
                key={uid}
              >
                <div
                  className="olw-item-title-bar"
                  onClick={() => handleChangeActiveObject(index)}
                  role="presentation"
                  aria-label={`${
                    activeObject === index
                      ? intl.formatMessage(messages.labelCollapseItem)
                      : intl.formatMessage(messages.labelShowItem)
                  } #${index ? index + 1 : ''}`}
                >
                  <div className="drag handle" {...listeners} {...attributes}>
                    <Icon name={dragSVG} size="18px" />
                  </div>

                  <div className="olw-item-title">
                    {(() => {
                      let networkIcon = null;
                      let networkTitle = null;
                      if (item.id) {
                        try {
                          const networkUtility = config.getUtility({
                            type: 'socialNetwork',
                            name: item.id,
                          });
                          if (networkUtility.method) {
                            const info = networkUtility.method();
                            networkIcon = info.icon;
                            networkTitle = info.title;
                          }
                        } catch (e) {
                          // Network not found, skip
                        }
                      }

                      return (
                        <>
                          {networkIcon && (
                            <Icon
                              name={networkIcon}
                              size="18px"
                              style={{ marginRight: '8px' }}
                            />
                          )}
                          {item.title ||
                            networkTitle ||
                            `${objectSchema.title} #${
                              index !== undefined ? index + 1 : ''
                            }`}
                        </>
                      );
                    })()}
                  </div>
                  <div className="olw-tools">
                    <div
                      role="presentation"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Button
                        aria-label={`${intl.formatMessage(
                          messages.labelRemoveItem,
                        )} #${index + 1}`}
                        onPress={() => {
                          onChange(
                            id,
                            value.filter((v, i) => i !== index),
                          );
                        }}
                      >
                        <Icon name={deleteSVG} size="20px" color="#e40166" />
                      </Button>
                    </div>
                    {activeObject === index ? (
                      <Icon name={upSVG} size="20px" />
                    ) : (
                      <Icon name={downSVG} size="20px" />
                    )}
                  </div>
                </div>
                <AnimateHeight
                  animateOpacity
                  duration={300}
                  height={activeObject === index ? 'auto' : 0}
                >
                  <div
                    className={cx('olw-item-content', {
                      active: activeObject === index,
                    })}
                  >
                    <ObjectWidget
                      id={`${uid}`}
                      key={`olw-${uid}`}
                      block={block}
                      schema={
                        schemaEnhancer
                          ? // @ts-ignore - TODO Make sure this continues to have sense
                            schemaEnhancer({
                              schema: objectSchema,
                              formData: item,
                              intl,
                            })
                          : objectSchema
                      }
                      value={item}
                      onChange={(fieldId: string, fieldValue: any) => {
                        const newvalue = value.map((v, i) =>
                          i !== index ? v : fieldValue,
                        );
                        onChange(id, newvalue);
                      }}
                    />
                  </div>
                </AnimateHeight>
              </div>
            );
          }}
        </DndSortableList>
      )}
    </div>
  );
};

export default SocialMediaObjectList;

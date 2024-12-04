"use client";

import React, { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import BannerItem from "@/components/domain/@admin/banners/BannerItem";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useRouter } from "next/navigation";
import { BannerType } from "@/types/banner";
import { updateBannerOrder } from "@/apis/banner";

interface Props {
  banners: BannerType[];
}

const BannerList = ({ banners }: Props) => {
  const router = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [items, setItems] = useState<BannerType[]>(banners);
  const [disabled, setDisabled] = useState<boolean>(false);

  const dragEndHandler = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;

    if (active.id !== over?.id) {
      setDisabled(true);

      const oldIdx = items.findIndex((item) => item._id === active.id);
      const newIdx = items.findIndex((item) => item._id === over?.id);

      setItems((prev) => arrayMove(prev, oldIdx, newIdx));

      const _from = await updateBannerOrder(
        items[oldIdx]._id,
        items[newIdx].order,
      );
      const _to = await updateBannerOrder(
        items[newIdx]._id,
        items[oldIdx].order,
      );

      if (_from.code !== 200 || _to.code !== 200) {
        alert("순서 변경에 실패하였습니다. 페이지를 새로고침 해 주세요.");
        setDisabled(false);
        return;
      }

      setDisabled(false);
    }
  };

  const deleteHandler = async (id: number) => {
    router.push(`/banners/delete/${id}`, { scroll: false });
  };

  return (
    <>
      <div className="relative h-full w-full">
        {disabled && (
          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-10"></div>
        )}
        <ul className="flex h-auto w-auto flex-col items-start justify-start gap-2 border-y-2 border-gray-300 bg-white p-6 shadow">
          {items.length <= 0 && (
            <li className="flex h-12 w-full items-center justify-center text-gray-300">
              등록된 배너가 없습니다.
            </li>
          )}
          {items.length > 0 && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={dragEndHandler}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
              <SortableContext
                disabled={disabled}
                items={items.map((item) => ({
                  id: item._id,
                  name: item.name,
                  description: item.description,
                  url: item.url,
                }))}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item) => (
                  <BannerItem
                    key={item._id}
                    data={{
                      id: item._id,
                      name: item.name,
                      description: item.description,
                      url: item.url,
                      order: item.order,
                    }}
                    onDelete={deleteHandler}
                  >
                    {item.name}
                  </BannerItem>
                ))}
              </SortableContext>
            </DndContext>
          )}
        </ul>
      </div>
      <div className="my-5 flex h-auto w-full flex-row items-center justify-end gap-4">
        <button
          className="h-12 w-40 rounded-md bg-sky-500 text-white shadow"
          onClick={() => router.push("/banners/upload", { scroll: false })}
        >
          배너 추가
        </button>
      </div>
    </>
  );
};

export default BannerList;
